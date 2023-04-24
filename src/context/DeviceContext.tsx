import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/configuration";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Device from "../utils/types/Device";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

interface IContext {
  devices: Device<string>[];
  thisDevice: DocumentData | undefined;
  thisDeviceInLocalStorage: Device<string> | undefined;
  setDeviceInLocalStorage: (device: Device<string>) => void;
  getDevices: {
    get: () => Promise<void>;
    cancel: () => void;
  };
  addDevice: (device: Device<string>) => void;
  newDevice: (device: Device<string>) => void;
  nextDirect: boolean;
  nextDirectToggle: () => void;
}

export const DeviceContext = createContext<IContext>({
  devices: [],
  thisDevice: undefined,
  thisDeviceInLocalStorage: undefined,
  setDeviceInLocalStorage: (device: Device<string>) => {},
  getDevices: {
    get: async () => {},
    cancel: () => {},
  },
  addDevice: (device: Device<string>) => {},
  newDevice: (device: Device<string>) => {},
  nextDirect: false,
  nextDirectToggle: () => {},
});

export const DeviceContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cancelled = useRef(false);
  const [devices, setDevices] = useState<Device<string>[]>([]);
  const [thisDeviceInLocalStorage, setThisDeviceInLocalStorage] = useState<
    Device<string> | undefined
  >(undefined);
  const [thisDevice, setThisDevice] = useState<DocumentData | undefined>(
    undefined
  );
  const [nextDirect, setNextDirect] = useState(false);

  const getDevices = useMemo(
    () => ({
      get: async () => {
        cancelled.current = false;
        const devicesSnapshot = await getDocs(
          collection(db, `Users/${user?.uid}/Devices`)
        );
        const info = devicesSnapshot.docs.map((device) => {
          const { name, deviceType, role, profileImg } = device.data();
          return { id: device.id, name, deviceType, role, profileImg };
        });
        if (!cancelled.current) {
          setDevices(info);
        }
      },
      cancel: () => {
        cancelled.current = true;
      },
    }),
    [user?.uid]
  );

  const bringProfileInfo = useMemo(
    () => ({
      get: async (profileId: string) => {
        cancelled.current = false;
        const deviceSnapshot = await getDoc(
          doc(db, `Users/${user?.uid}/Devices/${profileId}`)
        );
        const info = deviceSnapshot.data();
        if (!cancelled.current) {
          setThisDevice({ ...info, id: deviceSnapshot.id });
        }
      },
      cancel: () => {
        cancelled.current = true;
      },
    }),
    [user?.uid]
  );

  const addDevice = (device: Device<string>) => {
    if (user) {
      return addDoc(collection(db, `Users/${user?.uid}/Devices`), device).then(
        (doc) => {
          return doc.id;
        }
      );
    }
  };

  const setDeviceInLocalStorage = (device: Device<string>) => {
    const { id, name, deviceType, profileImg } = device;
    localStorage.setItem(
      "device",
      JSON.stringify({
        id,
        name,
        deviceType,
        profileImg,
      })
    );
    setThisDevice({ ...device, id: id });
  };

  const newDevice = (device: Device<string>) => {
    addDevice(device)?.then((id) => {
      setDeviceInLocalStorage({ ...device, id: id });
      navigate("/panel/cash/select");
    });
  };

  const nextDirectToggle = () => {
    setNextDirect(!nextDirect);
  };

  useEffect(() => {
    if (!nextDirect) {
      getDevices.get();
      return getDevices.cancel;
    } else if (nextDirect && thisDeviceInLocalStorage) {
      bringProfileInfo.get(thisDeviceInLocalStorage.id);
      return bringProfileInfo.cancel;
    }
  }, [bringProfileInfo, getDevices, nextDirect, thisDeviceInLocalStorage]);

  useEffect(() => {
    if (devices.length !== 0 && thisDeviceInLocalStorage) {
      const device = devices.find(
        (item) => item.id === thisDeviceInLocalStorage.id
      );
      if (device) {
        setThisDevice(device);
      }
    }
  }, [devices, setThisDevice, thisDeviceInLocalStorage]);

  useEffect(() => {
    const item = localStorage.getItem("device");
    if (item) {
      setThisDeviceInLocalStorage(JSON.parse(item));
    }
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        thisDevice,
        thisDeviceInLocalStorage,
        setDeviceInLocalStorage,
        getDevices,
        addDevice,
        newDevice,
        nextDirect,
        nextDirectToggle,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
