import { h, Fragment } from "preact";
import { Table, Tag, Space, Button } from "antd";

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { gql } from "graphql-request";
import axios from "axios";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName"
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName"
  },
  {
    title: "Grade",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "Classes",
    key: "classes",
    dataIndex: "classes",
    render: (classes) => (
      <Fragment>
        {classes &&
          classes.map((_class) => {
            return (
              <Tag color="green" key={_class}>
                {_class.toUpperCase()}
              </Tag>
            );
          })}
      </Fragment>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </Space>
    ),
  },
];

const queryClient = new QueryClient();

export default function Students() {
  return (
    <QueryClientProvider client={queryClient}>
      <Render />
    </QueryClientProvider>
  );
}

function Render() {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = getStudents();

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

function getStudents() {
  return useQuery("students", async () => {
    const { data: responce } = await axios("http://localhost:8000", {
      method: "POST",
      data: {
        query: gql`
          query {
            userMany {
              _id
              firstName
              lastName
              grade

            }
          }
        `,
      },
      withCredentials: true,
    });
    const { data } = responce;
    return data.userMany; // Returns an array of students
  });
}
