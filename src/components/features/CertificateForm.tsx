import { CertificateData, CERTIFICATE_TYPES, DOMAINS, ROLES } from '@/types/certificate';

interface Props {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
}

interface FieldConfig {
  key: keyof CertificateData;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  options?: readonly { value: string; label: string }[] | string[];
}

const FIELDS: FieldConfig[] = [
  { key: 'participantName', label: 'Participant Name', required: true, placeholder: 'e.g. Arjun Mehta' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'e.g. arjun@example.com' },
  { key: 'phone', label: 'Phone', type: 'tel', placeholder: 'e.g. +91 98765 43210' },
  { key: 'domain', label: 'Domain', options: DOMAINS, placeholder: 'Select domain' },
  { key: 'role', label: 'Role', options: ROLES, placeholder: 'Select role' },
  { key: 'certificateType', label: 'Certificate Type', options: CERTIFICATE_TYPES.map(t => ({ value: t.value, label: t.label })) },
  { key: 'eventName', label: 'Event / Internship', placeholder: 'e.g. HackFusion 2026' },
  { key: 'startDate', label: 'Start Date', type: 'date' },
  { key: 'endDate', label: 'End Date', type: 'date' },
  { key: 'issueDate', label: 'Issue Date', type: 'date' },
  { key: 'organization', label: 'Organization', placeholder: 'e.g. FIXTON Technologies' },
];

export default function CertificateForm({ data, onChange }: Props) {
  function handleChange(key: keyof CertificateData, value: string) {
    onChange({ ...data, [key]: value });
  }

  function isSelect(field: FieldConfig): boolean {
    return !!field.options;
  }

  function getOptions(field: FieldConfig): { value: string; label: string }[] {
    if (!field.options) return [];
    if (typeof field.options[0] === 'string') {
      return (field.options as string[]).map((o) => ({ value: o, label: o }));
    }
    return field.options as { value: string; label: string }[];
  }

  const inputBase = [
    'w-full px-3 py-3 rounded-lg text-sm',
    'bg-[#060e1a] border border-[#1a2f4a] text-[#e8f4ff]',
    'placeholder-[#3a5070]',
    'focus:outline-none focus:border-[#00d4ff]/60 focus:ring-1 focus:ring-[#00d4ff]/30',
    'transition-all duration-200',
    'min-h-[44px]',
  ].join(' ');

  const selectBase = [
    inputBase,
    'appearance-none cursor-pointer',
    'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2300d4ff\' stroke-width=\'2\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]',
    'bg-no-repeat bg-[right_10px_center]',
    'pr-9',
  ].join(' ');

  const labelBase = 'block text-xs font-semibold tracking-wider uppercase text-[#6a8aaa] mb-1.5';

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-gradient-to-b from-[#00d4ff] to-[#f0c040] rounded-full" />
        <h2 className="text-base font-semibold text-[#c8d8e8] font-cinzel tracking-wider">
          Participant Information
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map((field) => (
          <div
            key={field.key}
            className={field.key === 'participantName' || field.key === 'organization' ? 'sm:col-span-2' : ''}
          >
            <label className={labelBase}>
              {field.label}
              {field.required && <span className="text-[#00d4ff] ml-1">*</span>}
            </label>

            {isSelect(field) ? (
              <select
                className={selectBase}
                value={String(data[field.key] || '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                <option value="" disabled>
                  {field.placeholder || `Select ${field.label}`}
                </option>
                {getOptions(field).map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: '#0a1628' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                className={inputBase}
                placeholder={field.placeholder || ''}
                value={String(data[field.key] || '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Required note */}
      <p className="mt-4 text-[#3a5070] text-xs">
        <span className="text-[#00d4ff]">*</span> Required fields. All other fields are optional.
      </p>
    </div>
  );
}
