import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { createArticleAPI } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";
const { Option } = Select;

const Publish = () => {
  // 获取频道列表
  const {channelList} = useChannel();
  // 提交表单
  const onFinish = (formValue) => {
    console.log(formValue);
    if (imageList !== imageType) return message.warning("封面类型和图片不匹配");
    const { title, content, channel_id } = formValue;
    // 按照接口文档处理收集的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType, // 封面类型
        images: imageList.map((item) => item.response.data.url), // 图片列表
      },
      channel_id,
    };

    // 调用接口提交
    createArticleAPI(reqData);
  };
  // 图片上传方法
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    console.log("正在上传中", value);
    setImageList(value.fileList);
  };
  // 切换图片封面类型
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    console.log(e.target.value);
    setImageType(e.target.value);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value是选中之后的值 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType选择文件的外观
              showUploadList 控制上传列表
             */}
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload "}
                name="image"
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{ margin: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
