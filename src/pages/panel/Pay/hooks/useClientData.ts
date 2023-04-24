import { useContext, useState, ChangeEvent, useEffect } from "react";
import { PayContext } from "../../../../context/PayContext";
import { DocumentData } from "firebase/firestore";
import Debt from "../../../../utils/types/Debt";

const useCLientData = () => {
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    rut: "",
  });
  const [showCLientCreationForm, setShowCLientCreationForm] = useState(false);
  const [payType, setPayType] = useState<Debt["payType"]>("cash");
  const [organizedClientList, setOrganizedClientList] = useState<
    DocumentData[]
  >([]);
  const [selectedClient, setSelectedClient] = useState<DocumentData>();

  const { clients, registNewClient, findClient } = useContext(PayContext);

  const ClientCreationToggle = () => {
    setShowCLientCreationForm(!showCLientCreationForm);
  };

  const selectPaytype = (payType: Debt["payType"]) => {
    setPayType(payType)
  }

  const changeEventHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setClient({
      ...client,
      [e.currentTarget.name]: e.target.value,
    });
    if (
      e.currentTarget.name === "rut" ||
      e.currentTarget.name === "phoneNumber"
    ) {
      setClient({
        ...client,
        [e.currentTarget.name]: e.target.value.replace(/[^\d]/g, ""),
      });
      findClient.get(e.target.value.replace(/[^\d]/g, ""));
    }
  };

  const handleSubmmit = (client: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    rut: string;
  }) => {
    registNewClient(client);
    setClient({
      ...client,
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    });
  };

  const selectClient = (client: DocumentData) => {
    setSelectedClient(client);
    setClient({
      rut: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    });
  };

  useEffect(() => {
    if (client.rut !== "") {
      const filtered = clients.filter((item) =>
        item.rut
          .slice(0, client.rut.length)
          .includes(client.rut.slice(0, client.rut.length))
      );
      setOrganizedClientList(filtered);
    } else {
      setOrganizedClientList([]);
    }
  }, [client.rut, clients]);

  return {
    client,
    showCLientCreationForm,
    ClientCreationToggle,
    payType,
    selectPaytype,
    organizedClientList,
    selectedClient,
    changeEventHandle,
    handleSubmmit,
    selectClient,
  };
};

export default useCLientData;
