import { tigoReply, TIGO_PROMPTS } from '@/lib/services/tigo';

describe('tigoReply', () => {
  it('answers every suggested prompt without falling back', () => {
    for (const role of ['student', 'teacher', 'admin'] as const) {
      for (const prompt of TIGO_PROMPTS[role]) {
        expect(tigoReply(role, prompt)).not.toMatch(/can only answer/);
      }
    }
  });
  it('names the strongest skill from the data', () => {
    expect(tigoReply('student', 'What is my strongest skill?')).toMatch(/^Vocabulary is your strongest skill at 88%/);
  });
  it('names students who need attention', () => {
    expect(tigoReply('teacher', 'Who needs attention?')).toMatch(/Fatima Zahra/);
  });
  it('falls back honestly for unknown questions', () => {
    expect(tigoReply('admin', 'What is the weather?')).toMatch(/can only answer/);
  });
});
