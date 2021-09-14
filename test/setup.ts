jest.mock('@core/decorators/transactional.decorator', () => ({
  Transactional: () => () => ({}),
}));
