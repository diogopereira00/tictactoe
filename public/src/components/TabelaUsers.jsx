import React, { useEffect, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table,
  chakra,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  extendTheme,
  ChakraProvider,
  Avatar,
  useBreakpointValue,
  Badge,
  TableContainer,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { getAllUsersRoute } from "../utils/APIRoutes";
import axios from "axios";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faCheckCircle,
  faCircleMinus,
  faCircleXmark,
  faEdit,
  faPencil,
  faShield,
  faUserShield,
  faWandMagicSparkles,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function CustomTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };
  const theme = extendTheme({ colors });

  return (
    <ChakraProvider theme={theme}>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <Heading mt="1rem" textAlign="center" ml={["0rem", "2rem", "5rem"]}>
        Lista de Utilizadores{" "}
      </Heading>
      <TableContainer
        ml={["1rem", "2rem", "5rem"]}
        mr={["1rem", "2rem", "5rem"]}
        w={["95vw", "90vw", "90vw"]}
        mt="1rem"
        maxH="80vh"
        overflowY={"auto"}
        border="0.1rem solid rgba(255, 255, 255, 0.16)"
        borderRadius="1.5rem"
      >
        <Table variant="striped" {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    pl={column.Header === "JOGO" ? "4rem" : ""}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        {/* {cell.column.Header === "RESULTADO" ? (
                        <>
                          {console.log(cell.value)}

                          <Td
                            display={["none", null, "revert"]}
                            textAlign="center"
                            fontWeight={"bold"}
                            color={
                              cell.value === "VITORIA"
                                ? "green.300"
                                : cell.value === "EMPATE"
                                ? "yellow.300"
                                : "red.300"
                            }
                          >
                            {cell.value}
                          </Td>
                        </>
                      ) : (
                        " "
                      )} */}
                        <Td pt="0.25vh" pb="0.25vh" fontWeight={"bold"} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Td>
                      </>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>

        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Página
              <Text pl="1" pr="1" fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>
              de
              <Text ml="1" fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
            <Text flexShrink="0">Ir para:</Text>
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions.length}
              onChange={(value) => {
                const page = value ? value - 1 : 0;
                gotoPage(page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Ver {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Proxima Pagina">
              <IconButton
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Ultima Pagina">
              <IconButton
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </TableContainer>
    </ChakraProvider>
  );
}

function TabelaUsers(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const usersData = await axios.get(`${getAllUsersRoute}`);
      console.log(usersData.data.users);
      setUsers(usersData.data.users);
    }
    fetchData();
  }, []);

  useEffect(() => {}, []);
  const toast = useToast();

  const columns = React.useMemo(
    () => [
      // {
      //   Header: "Name",
      //   columns: [

      {
        Header: " ",
        accessor: "avatarImage",
        Cell: (tableProps) => (
          <Tooltip label={tableProps.row.original._id}>
            <Avatar
              onClick={() => {
                toast({
                  title: "ID do utilizador copiado.",
                  position: "bottom",
                  status: "success",
                  duration: 1500,
                  isClosable: true,
                });
              }}
              src={tableProps.row.original.avatarImage}
              size={useBreakpointValue({ base: "sm", md: "md" })}
              float="right"
              mt="0.52vh"
              mb="0.50vh"
            ></Avatar>
          </Tooltip>
        ),
      },
      {
        Header: "Utilizador",
        accessor: "username",
        Cell: (tableProps) => (
          <Flex>
            <Text ml="-1.5rem">{tableProps.row.original.username}</Text>
            <Tooltip label="Admin">
              <Text color="red.500" ml="0.3rem">
                {tableProps.row.original.isAdmin === true ? (
                  <FontAwesomeIcon size="sm" icon={faUserShield} />
                ) : null}{" "}
              </Text>
            </Tooltip>
          </Flex>
        ),
      },
      {
        Header: "CONTA CRIADA",
        accessor: "created",
        Cell: (props: { value: string }) => {
          const dia = dayjs(props.value).format("DD/MM/YY - HH:mm");

          return <Text>{dia}</Text>;
        },
      },
      {
        Header: "EMAIL",
        accessor: "email",
        Cell: (tableProps) => (
          <Text ml="0.2rem" pt="0.6rem">
            {tableProps.row.original.email}
          </Text>
        ),
      },
      {
        Header: "MUDAR EMAIL",
        Cell: (tableProps) => (
          <Button
            colorScheme={"yellow"}
            color="white"
            backgroundColor="yellow.500"
            onClick={() => {
              console.log("MudarEmail " + tableProps.row.original.username);
            }}
          >
            <FontAwesomeIcon size="lg" icon={faPencil} />
            <Text pl="0.2rem">Email </Text>
          </Button>
        ),
      },
      {
        Header: "MUDAR PASSWORD",
        Cell: (tableProps) => (
          <Button
            colorScheme={"orange"}
            backgroundColor="orange.500"
            color="white"
            onClick={() => {
              console.log("MudarPassword " + tableProps.row.original.username);
            }}
          >
            <FontAwesomeIcon size="lg" icon={faPencil} />
            <Text pl="0.2rem">Password </Text>
          </Button>
        ),
      },
      {
        Header: "BANIR",
        accessor: "banned",
        Cell: (tableProps) => (
          <>
            {tableProps.row.original.banned === true ? (
              <Button
                backgroundColor="green.700"
                colorScheme={"red"}
                color="white"
                onClick={() => {
                  console.log("Banir " + tableProps.row.original.username);
                }}
              >
                <FontAwesomeIcon size="lg" icon={faWandMagicSparkles} />
                <Text pl="0.2rem">Unban </Text>
              </Button>
            ) : (
              <Button
                backgroundColor="red.700"
                colorScheme={"red"}
                color="white"
                onClick={() => {
                  console.log("Banir " + tableProps.row.original.username);
                }}
              >
                <FontAwesomeIcon size="lg" icon={faBan} />
                <Text pl="0.2rem">Ban </Text>
              </Button>
            )}
          </>
        ),
      },

      // {
      //   Header: "TIPO DE JOGO",
      //   accessor: "melhorde",
      //   display: ["none", null, "revert"],
      //   Cell: (tableProps) => <Text>MELHOR DE {tableProps.row.original.melhorde}</Text>,
      // },
      // {
      //   Header: "RESULTADO",
      //   accessor: "resultado",
      //   Cell: (tableProps) => (
      //     <>
      //       <Text
      //         display={["revert", null, "none"]}
      //         fontWeight={"bold"}
      //         color={
      //           tableProps.row.original.resultado === "VITORIA"
      //             ? "green.300"
      //             : tableProps.row.original.resultado === "EMPATE"
      //             ? "yellow.300"
      //             : "red.300"
      //         }
      //       >
      //         {tableProps.row.original.resultado === "VITORIA" ? (
      //           <FontAwesomeIcon size="xl" icon={faCheckCircle} />
      //         ) : tableProps.row.original.resultado === "EMPATE" ? (
      //           <FontAwesomeIcon size="xl" icon={faCircleMinus} />
      //         ) : (
      //           <FontAwesomeIcon size="xl" icon={faCircleXmark} />
      //         )}
      //       </Text>

      //       <Text
      //         display={["none", null, "revert"]}
      //         fontWeight={"bold"}
      //         color={
      //           tableProps.row.original.resultado === "VITORIA"
      //             ? "green.300"
      //             : tableProps.row.original.resultado === "EMPATE"
      //             ? "yellow.300"
      //             : "red.300"
      //         }
      //       >
      //         {tableProps.row.original.resultado}
      //       </Text>
      //     </>
      //   ),
      // },
      // {
      //   Header: " ",
      //   accessor: "adversario.image",
      //   Cell: (tableProps) => (
      //     <Avatar
      //       src={tableProps.row.original.adversario.image}
      //       size={useBreakpointValue({ base: "sm", md: "md" })}
      //       float="right"
      //       mt="0.52vh"
      //       mb="0.50vh"
      //     ></Avatar>
      //   ),
      // },
      // {
      //   Header: "ADVERSARIO",
      //   accessor: "adversario.username",
      //   Cell: (tableProps) => (
      //     <Text ml="-1.5rem">{tableProps.row.original.adversario.username}</Text>
      //   ),
      // },

      // {
      //   Header: "DATA",
      //   accessor: "endTime",
      //   Cell: (props: { value: string }) => {
      //     const dia = dayjs(props.value).format("DD/MM/YY");
      //     const horas = dayjs(props.value).format("HH:mm");

      //     return (
      //       <>
      //         <Text pl="0.7rem">{horas}</Text>
      //         <Text>{dia}</Text>
      //       </>
      //     );
      //   },
      // },
      //     {
      //       Header: "Last Name",
      //       accessor: "lastName",
      //     },
      //   ],
      // },
      // {
      //   Header: "Info",
      //   columns: [
      //     {
      //       Header: "Age",
      //       accessor: "age",
      //     },
      //     {
      //       Header: "Visits",
      //       accessor: "visits",
      //     },
      //     {
      //       Header: "Status",
      //       accessor: "status",
      //     },
      //     {
      //       Header: "Profile Progress",
      //       accessor: "progress",
      //     },
      //   ],
      // },
    ],
    []
  );

  console.log(users);
  const data = users;

  return <CustomTable columns={columns} data={data} />;
}

export default TabelaUsers;
