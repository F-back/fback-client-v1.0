import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Card, Descriptions, Layout, Spin, Typography } from 'antd';
import { useProject } from '@/api/service/project';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <Layout.Content style={{ padding: '24px 50px' }}>
        <Spin size="large" />
      </Layout.Content>
    );
  }

  if (error || !project) {
    return (
      <Layout.Content style={{ padding: '24px 50px' }}>
        <Alert
          message="에러 발생"
          description="프로젝트 상세 정보를 불러오는데 실패했습니다."
          type="error"
        />
      </Layout.Content>
    );
  }

  return (
    <Layout.Content style={{ padding: '24px 50px' }}>
      <Typography.Title level={2}>{project.name}</Typography.Title>
      <Card style={{ marginBottom: 24 }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="프로젝트 ID">
            {project.id}
          </Descriptions.Item>
          <Descriptions.Item label="프로젝트 설명">
            {project.description}
          </Descriptions.Item>
          <Descriptions.Item label="매니저 ID">
            {project.managerId}
          </Descriptions.Item>
          <Descriptions.Item label="시작일">
            {new Date(project.startDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Descriptions.Item>
          <Descriptions.Item label="종료일">
            {new Date(project.endDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Descriptions.Item>
          {/* <Descriptions.Item label="상태">{project.status}</Descriptions.Item> */}
        </Descriptions>
      </Card>
    </Layout.Content>
  );
};

export default ProjectDetailPage;
