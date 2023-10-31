import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'LUOYINGDEHUIHEN出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '1ranxu',
          title: '1ranxu',
          href: 'https://github.com/1ranxu',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/1ranxu',
          blankTarget: true,
        },
        {
          key: 'Luo BI',
          title: 'Luo BI',
          href: 'https://github.com/1ranxu',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
