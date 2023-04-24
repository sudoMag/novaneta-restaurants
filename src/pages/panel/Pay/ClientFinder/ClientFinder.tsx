import formatStringByPattern from "format-string-by-pattern";
import { ClientList, InputsContainer, NewClientButton, SearchClientsBox } from "./ClientFinderStyles";
import { PatternFormat } from "react-number-format";
import newClientIcon from "../../../../icons/newcart.svg";
import useCLientData from "../hooks/useClientData";
import { InputBar } from "../PayPageStyles";

const ClientFinder = () => {
  const {
    client,
    ClientCreationToggle,
    organizedClientList,
    selectedClient,
    changeEventHandle,
    selectClient,
  } = useCLientData();

  return (
    <>
        <SearchClientsBox>
          <InputsContainer>
            <PatternFormat
              format="##.###.###-#"
              mask=""
              placeholder={"00.000.000-0"}
              valueIsNumericString={true}
              allowLeadingZeros={false}
              allowNegative={false}
              allowEmptyFormatting={false}
              allowDecimal={false}
              customInput={InputBar}
              name="rut"
              value={client.rut}
              onChange={changeEventHandle}
            />
            <NewClientButton
              src={newClientIcon}
              onClick={() => ClientCreationToggle()}
            />
          </InputsContainer>
          <ClientList>
            {organizedClientList.map((item) => (
              <>
                <li onClick={() => selectClient(item)}>
                  <PatternFormat
                    format="##.###.###-#"
                    mask=""
                    valueIsNumericString={true}
                    allowEmptyFormatting={false}
                    displayType="text"
                    renderText={(value) => (
                      <>
                        <span>
                          {value.slice(
                            0,
                            formatStringByPattern("99.999.999-1", client.rut)
                              .length
                          )}
                        </span>
                        {value.slice(
                          formatStringByPattern("99.999.999-1", client.rut)
                            .length,
                          value.length
                        )}
                      </>
                    )}
                    value={item.rut}
                  />
                </li>
                <li onClick={() => selectClient(item)}>
                  {item.firstName} {item.lastName}
                </li>
              </>
            ))}
          </ClientList>
        </SearchClientsBox>
      {selectedClient ? (
        <>
          <h2>
            pagará {selectedClient.firstName} {selectedClient.lastName}
          </h2>
          <span>
            {formatStringByPattern("99.999.999-1", selectedClient.rut)}
          </span>
        </>
      ) : null}
    </>
  );
};

export default ClientFinder;
