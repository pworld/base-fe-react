
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Statistic from 'antd/es/statistic';

export const DashboardPage: React.FC = () => {

  return (
    <>
      <h3>Widget</h3>
      <Row gutter={16}>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="BBCA"
              value={1.02}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined onPointerEnterCapture={null} onPointerLeaveCapture={null} />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="BBRI"
              value={5.35}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined onPointerEnterCapture={null} onPointerLeaveCapture={null} />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="TLKM"
              value={3.25}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined onPointerEnterCapture={null} onPointerLeaveCapture={null} />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="GZCO"
              value={1.16}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined onPointerEnterCapture={null} onPointerLeaveCapture={null} />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
