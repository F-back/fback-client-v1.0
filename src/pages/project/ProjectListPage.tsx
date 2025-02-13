import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Row, Spin, Typography } from 'antd';
import { Layout } from 'antd';
import { useProjects } from '@/api/service/project';

const ProjectListPage: React.FC = () => {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <Layout.Content style={{ padding: '24px 50px' }}>
        <Spin size="large" />
      </Layout.Content>
    );
  }

  if (error) {
    return (
      <Layout.Content style={{ padding: '24px 50px' }}>
        <Alert
          message="에러 발생"
          description="프로젝트 데이터를 불러오는데 실패했습니다."
          type="error"
        />
      </Layout.Content>
    );
  }

  return (
    <Layout.Content style={{ padding: '24px 50px' }}>
      <Typography.Title level={2}>프로젝트 목록</Typography.Title>
      <Row gutter={[16, 16]}>
        {projects?.map((project) => (
          <Col xs={24} sm={12} md={8} key={project.id}>
            <Card
              title={<Link to={`/projects/${project.id}`}>{project.name}</Link>}
              style={{ height: '100%' }}
            >
              <Typography.Paragraph type="secondary">
                {project.description}
              </Typography.Paragraph>
              <Typography.Text>
                시작일: {new Date(project.startDate).toLocaleDateString()}
              </Typography.Text>
              <br />
              <Typography.Text>
                종료일: {new Date(project.endDate).toLocaleDateString()}
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout.Content>
  );
};

export default ProjectListPage;
