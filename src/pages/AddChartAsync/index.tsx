import { UploadOutlined } from '@ant-design/icons';

import { genChartByAIAsyncUsingPOST } from '@/services/luobi/chartController';
import { Button, Card, Form, message, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

/**
 * 添加图表（异步）页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (loading) {
      return;
    }
    setLoading(true);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAIAsyncUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res.data) {
        message.error('分析失败');
      } else {
        message.success('分析任务提交成功，稍后请在个人图表页面查看');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="addChartAsync">
      <Card title={'智能分析'}>
        <Form
          form={form}
          name="addChart"
          onFinish={onFinish}
          initialValues={{}}
          labelAlign={'left'}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            label={'分析目标'}
            name={'goal'}
            rules={[{ required: true, message: '请输入分析目标!' }]}
          >
            <TextArea placeholder={'请输入分析目标，比如：分析网站的用户增长趋势'} />
          </Form.Item>

          <Form.Item label={'图表名称'} name={'chartName'}>
            <TextArea placeholder={'请输入图表名称，比如：用户数据表'} />
          </Form.Item>

          <Form.Item name="chartType" label="图表类型">
            <Select
              placeholder="请选择图表类型"
              options={[
                { value: '折线图', label: '折线图' },
                { value: '柱状图', label: '柱状图' },
                { value: '堆叠图', label: '堆叠图' },
                { value: '雷达图', label: '雷达图' },
                { value: '饼图', label: '饼图' },
              ]}
            />
          </Form.Item>

          <Form.Item name="file" label="上传文件">
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined />}>EXCEL 文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAsync;
