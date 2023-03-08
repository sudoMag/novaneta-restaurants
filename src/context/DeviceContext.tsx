import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Device from "../interfaces/Device";
import { UserContext } from "./UserContext";

interface IContext {
  devices: Device[];
  thisDevice: Device | undefined;
  getDevices: {
    get: () => Promise<void>;
    cancel: () => void;
  };
  addDevice: (device: Device) => void;
  setDevice: (device: Device) => void;
  nextDirect: boolean;
  nextDirectToggle: () => void;
}

export const DeviceContext = createContext<IContext>({
  devices: [],
  thisDevice: undefined,
  getDevices: {
    get: async () => {},
    cancel: () => {},
  },
  addDevice: (device: Device) => {},
  setDevice: (device: Device) => {},
  nextDirect: false,
  nextDirectToggle: () => {},
});

export const DeviceContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useContext(UserContext);
  const cancelled = useRef(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [thisDevice, setThisDevice] = useState<Device | undefined>(undefined);
  const [nextDirect, setNextDirect] = useState(false);

  const getDevices = useMemo(
    () => ({
      get: async () => {
        cancelled.current = false;
        const devicesSnapshot = await getDocs(
          collection(db, `Users/${user?.uid}/Devices`)
        );
        const info = devicesSnapshot.docs.map((device) => {
          const { name, deviceType } = device.data();
          return { name, deviceType };
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

  const addDevice = (device: Device) => {
    if (user) {
      addDoc(collection(db, `Users/${user?.uid}/Devices`), device);
    }
  };

  const setDevice = (device: Device) => {
    const { name, deviceType } = device;
    addDevice(device);
    localStorage.setItem(
      "device",
      JSON.stringify({
        name,
        deviceType,
      })
    );
  };

  const nextDirectToggle = () => {
    setNextDirect(!nextDirect);
  };

  useEffect(() => {
    getDevices.get();

    return getDevices.cancel();
  }, [getDevices])

  useEffect(() => {
    const item = localStorage.getItem("device");
    if (item) {
      setThisDevice(JSON.parse(item));
    }
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        thisDevice,
        getDevices,
        addDevice,
        setDevice,
        nextDirect,
        nextDirectToggle,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
