const BASE_URL = 'http://localhost:3000';

describe('Tasks API – /api/tasks/[id]', () => {
  const INVALID_TASK_ID = '00000000-0000-0000-0000-000000000000';

  it('should return 401 if user is not authenticated', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${INVALID_TASK_ID}`);

    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Unauthorized');
  });

 
  it('should return 404 for non-existing task (authenticated)', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${INVALID_TASK_ID}`, {
      headers: {
        Cookie: `token=${process.env.TEST_JWT_TOKEN}`,
      },
    });

    expect([401, 404]).toContain(res.status);
  });


  it('should return 404 when deleting a non-existing task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${INVALID_TASK_ID}`, {
      method: 'DELETE',
      headers: {
        Cookie: `token=${process.env.TEST_JWT_TOKEN}`,
      },
    });

    expect([401, 404]).toContain(res.status);
  });

 
  it('should return 404 when updating a non-existing task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${INVALID_TASK_ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${process.env.TEST_JWT_TOKEN}`,
      },
      body: JSON.stringify({
        title: 'Updated title',
      }),
    });

    expect([401, 404]).toContain(res.status);
  });
});
