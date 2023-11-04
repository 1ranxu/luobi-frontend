import { listMyChartVOByPageUsingPOST } from '@/services/luobi/chartController';
import { useModel } from '@@/exports';
import { Avatar, Card, List, message } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const MyChart: React.FC = () => {
  const initSearchParams = {
    pageSize: 2,
    current: 1,
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.Chart[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartVOByPageUsingPOST({
        ...searchParams,
        userId: currentUser?.id,
      });
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        //隐藏图表的title
        if (res.data.records) {
          res.data.records.forEach((chart) => {
            const chartOption = JSON.parse(chart.genChart ?? '{}');
            chartOption.title = undefined;
            chart.genChart = JSON.stringify(chartOption);
          });
        }
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败，' + e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);
  return (
    <div className="myChart">
      <div>
        <Search
          placeholder="请输入图表名称"
          enterButton
          size="large"
          loading={loading}
          onSearch={(value) => {
            setSearchParams({
              ...searchParams,
              chartName: value,
              current: 1,
            });
          }}
        />
      </div>
      <div className={'margin-16'} />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        loading={loading}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize: pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={currentUser?.userAvatar} />}
                title={item.chartName}
                description={'分析目标：' + item.goal}
              />
              <p>{'分析结论：' + item.genSummary}</p>
              <div className={'margin-16'} />
              <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
            </Card>
          </List.Item>
        )}
      />
      <br />
      总数
      {total}
    </div>
  );
};
export default MyChart;
