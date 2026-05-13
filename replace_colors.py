import re
import math

tokens = {
    '--color-neutral-0': '#FFFFFF',
    '--color-neutral-50': '#F8F8F8',
    '--color-neutral-100': '#F1F1F1',
    '--color-neutral-300': '#E4E4E4',
    '--color-neutral-400': '#B4B4B4',
    '--color-neutral-500': '#8F8F8F',
    '--color-neutral-600': '#6F6F6F',
    '--color-neutral-700': '#4A4A4A',
    '--color-neutral-800': '#2A2A2A',
    '--color-neutral-900': '#151515',
    '--color-neutral-1000': '#0A0A0A',
    '--color-blue-50': '#EFF6FF',
    '--color-blue-100': '#DBEAFE',
    '--color-blue-200': '#BFDBFE',
    '--color-blue-300': '#93C5FD',
    '--color-blue-400': '#60A5FA',
    '--color-blue-500': '#3B82F6',
    '--color-blue-600': '#2563EB',
    '--color-blue-700': '#1D4ED8',
    '--color-blue-800': '#1E40AF',
    '--color-green-50': '#ECFDF5',
    '--color-green-100': '#D1FAE5',
    '--color-green-200': '#A7F3D0',
    '--color-green-300': '#6EE7B7',
    '--color-green-400': '#34D399',
    '--color-green-500': '#10B981',
    '--color-green-600': '#059669',
    '--color-green-700': '#047857',
    '--color-green-800': '#065F46',
    '--color-red-50': '#FEF2F2',
    '--color-red-100': '#FEE2E2',
    '--color-red-200': '#FECACA',
    '--color-red-300': '#FCA5A5',
    '--color-red-400': '#F87171',
    '--color-red-500': '#EF4444',
    '--color-red-600': '#DC2626',
    '--color-red-700': '#B91C1C',
    '--color-red-800': '#991B1B',
    '--color-orange-50': '#FFF7ED',
    '--color-orange-100': '#FFEDD5',
    '--color-orange-200': '#FED7AA',
    '--color-orange-300': '#FDBA74',
    '--color-orange-400': '#FB923C',
    '--color-orange-500': '#F97316',
    '--color-orange-600': '#EA580C',
    '--color-orange-700': '#C2410C',
    '--color-orange-800': '#9A3412',
}

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#').upper()
    if len(hex_str) == 3:
        hex_str = ''.join([c*2 for c in hex_str])
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def color_distance(c1, c2):
    return sum((a - b) ** 2 for a, b in zip(c1, c2))

parsed_tokens = {k: hex_to_rgb(v) for k, v in tokens.items()}

def closest_token(hex_str):
    try:
        rgb = hex_to_rgb(hex_str)
        closest = min(parsed_tokens.keys(), key=lambda k: color_distance(rgb, parsed_tokens[k]))
        return closest
    except:
        return hex_str

with open('src/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the @theme block
theme_start = content.find('@theme {')
theme_end = content.find('/* ─── Spacing tokens ─── */')

if theme_start != -1 and theme_end != -1:
    new_theme = """@theme {
  --font-sans: 'Open Sans', sans-serif;

  /* ─── Global Color Tokens ─── */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #F8F8F8;
  --color-neutral-100: #F1F1F1;
  --color-neutral-300: #E4E4E4;
  --color-neutral-400: #B4B4B4;
  --color-neutral-500: #8F8F8F;
  --color-neutral-600: #6F6F6F;
  --color-neutral-700: #4A4A4A;
  --color-neutral-800: #2A2A2A;
  --color-neutral-900: #151515;
  --color-neutral-1000: #0A0A0A;

  --color-blue-50: #EFF6FF;
  --color-blue-100: #DBEAFE;
  --color-blue-200: #BFDBFE;
  --color-blue-300: #93C5FD;
  --color-blue-400: #60A5FA;
  --color-blue-500: #3B82F6;
  --color-blue-600: #2563EB;
  --color-blue-700: #1D4ED8;
  --color-blue-800: #1E40AF;

  --color-green-50: #ECFDF5;
  --color-green-100: #D1FAE5;
  --color-green-200: #A7F3D0;
  --color-green-300: #6EE7B7;
  --color-green-400: #34D399;
  --color-green-500: #10B981;
  --color-green-600: #059669;
  --color-green-700: #047857;
  --color-green-800: #065F46;

  --color-red-50: #FEF2F2;
  --color-red-100: #FEE2E2;
  --color-red-200: #FECACA;
  --color-red-300: #FCA5A5;
  --color-red-400: #F87171;
  --color-red-500: #EF4444;
  --color-red-600: #DC2626;
  --color-red-700: #B91C1C;
  --color-red-800: #991B1B;

  --color-orange-50: #FFF7ED;
  --color-orange-100: #FFEDD5;
  --color-orange-200: #FED7AA;
  --color-orange-300: #FDBA74;
  --color-orange-400: #FB923C;
  --color-orange-500: #F97316;
  --color-orange-600: #EA580C;
  --color-orange-700: #C2410C;
  --color-orange-800: #9A3412;
  
  /* ─── Semantic Colors (Mapped to Tokens) ─── */
  --color-bg: var(--color-neutral-50);
  --color-surface: var(--color-neutral-0);
  --color-surface-alt: var(--color-neutral-100);
  --color-border: var(--color-neutral-300);
  --color-border-light: var(--color-neutral-100);

  --color-text-primary: var(--color-neutral-800);
  --color-text-heading: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-700);
  --color-text-muted: var(--color-neutral-600);
  --color-text-disabled: var(--color-neutral-500);
  --color-text-placeholder: var(--color-neutral-400);
  --color-text-chip: var(--color-neutral-600);

  --color-accent: var(--color-green-500);
  --color-accent-light: var(--color-green-100);
  --color-accent-surface: var(--color-green-50);
  --color-accent-dark: var(--color-green-600);

  --color-info: var(--color-blue-500);
  --color-info-light: var(--color-blue-50);
  --color-error: var(--color-red-500);
  --color-error-light: var(--color-red-50);
  --color-success: var(--color-green-500);
  --color-warning: var(--color-orange-400);

  --color-btn-dark: var(--color-neutral-800);
  --color-btn-mid: var(--color-neutral-600);
  --color-btn-light: var(--color-neutral-100);

  """
    content = content[:theme_start] + new_theme + content[theme_end:]

def replacer(match):
    hex_color = match.group(0)
    token = closest_token(hex_color)
    return f"var({token})"

# Replace hex colors in the rest of the file
theme_end_idx = content.find('/* ─── Spacing tokens ─── */')
if theme_end_idx == -1:
    theme_end_idx = 0

css_body = content[theme_end_idx:]
css_body = re.sub(r'#[0-9a-fA-F]{3,6}\b', replacer, css_body)
content = content[:theme_end_idx] + css_body

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete")
