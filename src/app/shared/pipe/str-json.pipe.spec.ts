import { StrJsonPipe } from './str-json.pipe';

describe('StrJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new StrJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
