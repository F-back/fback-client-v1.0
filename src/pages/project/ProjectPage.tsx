import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Layout } from 'antd';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  managerId: number;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('프로젝트 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout.Content style={{ padding: '24px 50px' }}>
      <Typography.Title level={2}>프로젝트 목록</Typography.Title>
      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col xs={24} sm={12} md={8} key={project.id}>
            <Card title={project.name} style={{ height: '100%' }}>
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

export default ProjectPage;
