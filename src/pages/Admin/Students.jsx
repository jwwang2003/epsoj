import { h, Fragment } from "preact";
import { Table, Tag, Space, Button, Radio } from "antd";
import { useHistory } from "react-router-dom";

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import {request, gql } from "graphql-request";
import axios from "axios";

const test = async (username) => {
  const query = gql`
    mutation removeUser($username: String!) {
      userRemoveOne(filter: {username: $username}) {
        record {
          firstName
        }
      }
    }
  `
  const variables = {
    username: username,
  }
  console.log(query);
  const data = await request("http://localhost:8000/api", query, variables)
  console.log(data)
};

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
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
    dataIndex: ["username"],
    render: (text, record) => (
      <Space size="middle">
        {console.log(record)}
        <Button size="small">Edit</Button>
        <Button size="small" onClick={() => test(record.username)}>Delete</Button>
      </Space>
    ),
  },
];

const queryClient = new QueryClient();

export default function Students() {
  const history = useHistory();

  const handleAddStudents = () => history.push("/admin/addStudents");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="sub-page-header">
        <Button type="dashed">Mass Manage</Button>
        <Radio.Group>
          <Radio.Button value="horizontal">Class</Radio.Button>
          <Radio.Button value="vertical">Grade</Radio.Button>
          <Radio.Button value="inline">Last Name</Radio.Button>
        </Radio.Group>
        <Button type="primary" onClick={handleAddStudents}>
          Add Student(s)
        </Button>
      </div>
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
        <Table columns={columns} dataSource={data} style={{ width: "100%" }} />
      )}
    </div>
  );
}

function getStudents() {
  return useQuery("students", async () => {
    const { data: responce } = await axios("http://localhost:8000/api", {
      method: "POST",
      data: {
        query: gql`
          query {
            userMany {
              _id
              firstName
              lastName
              grade
              username
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
