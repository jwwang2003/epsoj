
import { Radio, Button, List, Form, Select, Space, Input } from 'antd'

import { PlusOutlined, SelectOutlined, MinusCircleOutlined } from '@ant-design/icons'

const grades = [
  '8', '9', '10', '11', '12'
];

export default function AddStudent() {
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };
  return (
    <Form form={form} onFinish={onFinish} autoComplete="off">
      <Form.List name="sights" >
        {(fields, { add, remove }) => (
          <>
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Student
              </Button>
            </Form.Item>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="User"
                  name={[field.name, 'User']}
                  fieldKey={[field.fieldKey, 'User']}
                  rules={[{ required: true, message: 'User is required' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Password"
                  name={[field.name, 'Password']}
                  fieldKey={[field.fieldKey, 'Password']}
                  rules={[{ required: true, message: 'Password is required' }]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item name="Grade" label="Grade" rules={[{ required: true, message: 'Grade is required' }]} style={{minWidth: "150px"}}>
                  <Select style={{ width: 75 }}>
                    {(grades).map(item => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}