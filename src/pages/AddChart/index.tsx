import { UploadOutlined } from '@ant-design/icons';

import { genChartByAIUsingPOST } from '@/services/luobi/chartController';
import { Button, Card, Col, Divider, Form, message, Row, Select, Space, Spin, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BIResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [option, setOption] = useState<any>();

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
    setChart(undefined);
    setOption(undefined);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAIUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误')
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="addChart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title={'智能分析'}>
            <Form
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
                  placeholder="Please select a chartType"
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
        </Col>
        <Col span={12}>
          <Card title={'分析结论'}>
            <div>{chart?.genSummary ?? '请先在左侧进行提交'}</div>
            <Spin spinning={loading} />
          </Card>
          <Divider />
          <Card title={'可视化图表'}>
            {option ? <ReactECharts option={option} /> : <div>请先在左侧进行提交</div>}
            <Spin spinning={loading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
