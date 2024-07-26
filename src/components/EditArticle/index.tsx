import React, {SetStateAction, useEffect, useState} from "react";
import './index.less'
import {Button, Form, GetProp, Input, message, Modal, Select, Upload, UploadFile, UploadProps} from "antd";
import MDEditor from '@uiw/react-md-editor';
import 'react-mde/lib/styles/css/react-mde-all.css';
import {PlusOutlined} from "@ant-design/icons";
import {submitArticle} from "@/services/article/api";
import {history} from '@umijs/max';
import {useSelector} from "react-redux";
import uploadFile from "@/services/file/api";



const EditArticle:React.FC = () => {
  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
  const [markdown, setMarkdown] = useState<string | undefined>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([
  ]);
  const userInfo = useSelector(state => state.state.userInfo);

  useEffect(() => {
    console.log('编辑文章', userInfo)
  }, []);
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const onFinish = async (values: ARTICLE.EditArticle) => {
    console.log(fileList[0].xhr.url)
    values.articleCover = fileList[0].xhr.url
    console.log('article:', values);
    const result = await submitArticle(values);
    if (result.respCode === 0) {
      message.success(result.respMsg)
      history.push('/')
    } else {
      message.error(result.respMsg)

    }

  };


  const saveArticle = () => {}

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploader = async ({ file, onSuccess, onError } : any) => {
    // 生成随机时间戳
    const timestamp = new Date().getTime();
    // 获取原始文件名和后缀
    const { name } = file;
    const fileExtension = name.split('.').pop();
    const userId = userInfo?.id
    // 构建新的文件名，例如 "userId_1234567890123.jpg"
    const newFilename = `article-cover_${userId}_${timestamp}.${fileExtension}`;
    const newFile = new File([file], newFilename, { type: file.type });
    const formData = new FormData();
    formData.append('file', newFile);
    const result = await uploadFile(formData)
    if (result.respCode === 0) {
      const data = result.data
      if (data) {
        const uploadedFile = {
          ...file,
          uid: file.uid, // 保持文件的唯一标识符
          name: newFilename, // 使用新文件名
          status: 'done', // 设置文件状态为完成
          url: data.url, // 设置文件 URL
        };
        setFileList((prevFileList) => [...prevFileList, uploadedFile]);
        onSuccess(result.respMsg, uploadedFile);
        message.success(`上传成功!`);
      }

    } else {
      onError(result.respMsg, newFile);
      message.error(result.respMsg);
    }
  }

  const insertToTextArea = (intsertString: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) {
      return null;
    }

    let sentence = textarea.value;
    const len = sentence.length;
    const pos = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const front = sentence.slice(0, pos);
    const back = sentence.slice(pos, len);

    sentence = front + intsertString + back;

    textarea.value = sentence;
    textarea.selectionEnd = end + intsertString.length;

    return sentence;
  };

  const onImagePasted = async (
    dataTransfer: DataTransfer,
    setMarkdown: (value: SetStateAction<string | undefined>) => void
  ) => {
    const files: File[] = [];
    for (let index = 0; index < dataTransfer.items.length; index += 1) {
      const file = dataTransfer.files.item(index);

      if (file) {
        files.push(file);
      }
    }

    await Promise.all(
      files.map(async (file) => {
        // 生成随机时间戳
        const timestamp = new Date().getTime();
        // 获取原始文件名和后缀
        const { name } = file;
        const fileExtension = name.split('.').pop();
        const userId = userInfo?.id
        // 构建新的文件名，例如 "userId_1234567890123.jpg"
        const newFilename = `article-md_${userId}_${timestamp}.${fileExtension}`;
        const newFile = new File([file], newFilename, { type: file.type });
        const formData = new FormData();
        formData.append('file', newFile);
        const result = await uploadFile(formData)
        if (result.respCode === 0) {
          const data = result.data
          if (data) {
            const insertedMarkdown = insertToTextArea(`![](${data.url})`);
            if (!insertedMarkdown) {
              return;
            }
            //setMarkdown(insertedMarkdown);
            message.success(`上传成功!`);
            return;
          }

        } else {
          message.error(result.respMsg);
          return;
        }
      })
    );
  };


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (<div>
    <div className="edit-content">
      <div className="edit-container">
        <Form
          form={form}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 26 }}
          name="editArticle"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ maxWidth: 2500, width: '100%' }}
        >
          <Form.Item<ARTICLE.EditArticle>
            label="标题"
            name="articleTitle"
            rules={[{ required: true, message: '请输入文章标题!' }]}
          >
            <Input
              style={{width: '100%'}}
              count={{
              show: true,
              max: 30,
              }}
              placeholder="请输入文章标题"/>
          </Form.Item>
          <Form.Item<ARTICLE.EditArticle>
            label="视频链接"
            name="articleVideo"
          >
            <Input placeholder="请输入视频链接"/>
          </Form.Item>
          <Form.Item<ARTICLE.EditArticle>
            label="内容"
            name="articleContent"
          >
            {/*<div className="markdown-editor-container">*/}
            {/*  <div className="markdown-editor-write">*/}
            {/*    <ReactMde*/}
            {/*      value={value}*/}
            {/*      onChange={setValue}*/}
            {/*      selectedTab="write"*/}
            {/*      loadSuggestions={loadSuggestions}*/}
            {/*      minEditorHeight={461}*/}
            {/*      paste={{*/}
            {/*        saveImage: imaSave,*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <div className="markdown-editor-preview">*/}
            {/*    <ReactMde*/}
            {/*      value={value}*/}
            {/*      onChange={setValue}*/}
            {/*      selectedTab="preview"*/}
            {/*      generateMarkdownPreview={markdown =>*/}
            {/*        Promise.resolve(converter.makeHtml(markdown))*/}
            {/*      }*/}
            {/*      minPreviewHeight={450}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <MDEditor
              value={markdown}
              onChange={(value) => {
                setMarkdown(value);
              }}
              onPaste={async (event) => {
                await onImagePasted(event.clipboardData, setMarkdown);
              }}
              onDrop={async (event) => {
                await onImagePasted(event.dataTransfer, setMarkdown);
              }}
            />
          </Form.Item>
          <Form.Item<ARTICLE.EditArticle>
            label="文章封面图"
            name="articleCover"
          >
            <Upload
              customRequest={uploader}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item<ARTICLE.EditArticle>
            label="分类"
            name="categoryId"
            rules={[{ required: true, message: '请选择文章分类!' }]}
          >
            <Select
              allowClear
              defaultValue=""
              style={{ width: 200 }}
              options={[{ value: '1', label: 'JavaScript' }]}
            />
          </Form.Item>
          <Form.Item<ARTICLE.EditArticle>
            label="标签"
            name="tagIdList"
            rules={[{ required: true, message: '请选择文章标签!' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: 200 }}
              options={[{ value: '1', label: '日常学习' }]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" className="submitButton" htmlType="submit" >
              发布文章
            </Button>

            <Button htmlType="button"  className="saveButton" onClick={saveArticle}>
              保存草稿
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  </div>)
}

export default EditArticle;