module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      // startServerCommand: 'npm run preview', // 서버를 키는 명령어를 통해서도 실행 가능
      url: ['http://localhost:5173'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.5 }],
        'categories:accessibility': ['error', { minScore: 0.5 }],
        'categories:best-practices': ['error', { minScore: 0.5 }],
        'categories:seo': ['error', { minScore: 0.5 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
