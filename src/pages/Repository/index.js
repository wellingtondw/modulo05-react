import React, { useState, useEffect } from 'react';
import api from '../../services/api';
// import { Container } from './styles';

export default function Repository({ match }) {
  const [repository, setRepository] = {};
  const [issues, setIssues] = [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadingGithubData() {
      const repoName = decodeURIComponent(match.params.repository);

      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repository.data);
      setIssues(issues.data);
      setLoading(false);
    }
    loadingGithubData();
  }, []);

  return <h1>Repository</h1>;
}
