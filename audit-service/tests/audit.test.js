test("audit event has correct structure", () => {
  const auditEvent = {
    event: "user_created",
    user: {
      name: "Charaf",
      email: "charaf@example.com"
    },
    userId: "123",
    createdAt: new Date()
  };

  expect(auditEvent.event).toBe("user_created");
  expect(auditEvent.user.name).toBe("Charaf");
  expect(auditEvent.user.email).toBe("charaf@example.com");
  expect(auditEvent.userId).toBe("123");
  expect(auditEvent.createdAt).toBeInstanceOf(Date);
});