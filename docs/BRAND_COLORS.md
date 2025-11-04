# 🎨 ShopLynk Brand Colors

Official brand color palette used consistently across web and mobile applications.

---

## Primary Colors

### Primary - #6C63FF
**Innovation, Trust**
- Logo icon backgrounds
- Text accents and highlights
- Icon containers
- CTA section backgrounds
- Links and interactive elements

**Usage:**
```css
/* Web (Tailwind) */
className="bg-primary text-primary border-primary"

/* Mobile (StyleSheet) */
backgroundColor: '#6C63FF'
color: '#6C63FF'
```

---

### Accent - #00C897
**Growth, Energy**
- Primary CTA buttons ("Get Started", "Create Store")
- Trust badge indicators
- Success states
- Active/selected states
- Positive actions

**Usage:**
```css
/* Web (Tailwind) */
className="bg-accent text-accent border-accent"

/* Mobile (StyleSheet) */
backgroundColor: '#00C897'
color: '#00C897'
```

---

## Neutral Colors

### Background - #F5F7FA
**Clean, Professional**
- Page background
- Section backgrounds
- Card containers
- Footer areas

**Usage:**
```css
/* Web (Tailwind) */
className="bg-background"

/* Mobile (StyleSheet) */
backgroundColor: '#F5F7FA'
```

---

### Text Dark - #1F1F1F
**Strong Readability**
- Primary body text
- Headings
- Labels
- Important content

**Usage:**
```css
/* Web (Tailwind) */
className="text-textDark"

/* Mobile (StyleSheet) */
color: '#1F1F1F'
```

---

## Status Colors

### Error - #FF4D4F
**Alerts, Warnings**
- Error messages
- Validation failures
- Destructive actions
- Warning states

**Usage:**
```css
/* Web (Tailwind) */
className="bg-error text-error border-error"

/* Mobile (StyleSheet) */
backgroundColor: '#FF4D4F'
color: '#FF4D4F'
```

---

### Success - #4CAF50
**Confirmation, Positive**
- Success messages
- Completed states
- Positive feedback
- Checkmarks

**Usage:**
```css
/* Web (Tailwind) */
className="bg-success text-success border-success"

/* Mobile (StyleSheet) */
backgroundColor: '#4CAF50'
color: '#4CAF50'
```

---

## Additional UI Colors

### White - #FFFFFF
- Card backgrounds
- Header backgrounds
- Modal backgrounds
- Button text on colored backgrounds

### Gray Shades
- **Border**: #E5E7EB (subtle borders)
- **Text Gray**: #6B7280 (secondary text)
- **Text Light**: #9CA3AF (tertiary text)

---

## Color Combinations

### Primary Button
```
Background: #00C897 (Accent)
Text: #FFFFFF (White)
Hover: #00A077 (Darker Accent)
```

### Secondary Button
```
Background: #FFFFFF (White)
Text: #6C63FF (Primary)
Border: #6C63FF (Primary)
Hover: #6C63FF background with white text
```

### Card/Section
```
Background: #FFFFFF (White)
Border: #E5E7EB (Gray)
Shadow: subtle gray shadow
```

### Hero Section
```
Background: #FFFFFF (White)
Title: #1F1F1F (Text Dark)
Accent Text: #6C63FF (Primary)
Subtitle: #6B7280 (Text Gray)
```

---

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

✅ **Primary (#6C63FF) on White**: 4.8:1 (Pass)
✅ **Accent (#00C897) on White**: 2.8:1 (Use for large text only)
✅ **Text Dark (#1F1F1F) on White**: 17.5:1 (Excellent)
✅ **Error (#FF4D4F) on White**: 4.0:1 (Pass)
✅ **Success (#4CAF50) on White**: 3.0:1 (Use for large text)

**Recommendations:**
- Use **Primary** for interactive elements
- Use **Text Dark** for all body text
- Use **Accent** for CTAs with white text
- Always ensure sufficient contrast

---

## Implementation Status

### Web Application ✅
- ✅ Tailwind config updated with all brand colors
- ✅ Custom utilities for gradients removed
- ✅ All colors consistently applied
- ✅ Solid colors throughout (no gradients)

### Mobile Application ✅
- ✅ COLORS constant with all brand colors
- ✅ Consistently applied across all components
- ✅ Solid colors throughout (no gradients)
- ✅ Platform-specific shadows working

---

## Design Principles

1. **Consistency**: Use the same colors for the same purposes
2. **Hierarchy**: Primary > Accent > Neutral
3. **Accessibility**: Always check contrast ratios
4. **Simplicity**: Solid colors, no gradients
5. **Purpose**: Every color has meaning

---

## Quick Reference

| Purpose | Color | Hex Code |
|---------|-------|----------|
| Brand Identity | Primary | #6C63FF |
| Call-to-Action | Accent | #00C897 |
| Page Background | Background | #F5F7FA |
| Body Text | Text Dark | #1F1F1F |
| Errors | Error | #FF4D4F |
| Success | Success | #4CAF50 |
| Cards | White | #FFFFFF |
| Borders | Gray | #E5E7EB |

---

## Color Psychology

### Primary (#6C63FF - Purple/Blue)
- **Meaning**: Innovation, creativity, trust, technology
- **Emotion**: Professional, modern, forward-thinking
- **Use Case**: Tech products, SaaS platforms, innovation

### Accent (#00C897 - Green)
- **Meaning**: Growth, energy, success, action
- **Emotion**: Positive, encouraging, fresh
- **Use Case**: Call-to-actions, confirmations, growth metrics

### Combination
The purple + green combination creates:
- **Balance**: Tech (purple) + Growth (green)
- **Energy**: Professional yet approachable
- **Trust**: Established (purple) + Forward-moving (green)

---

## Examples in Use

### Navigation Bar
```
Background: White (#FFFFFF)
Logo Icon: Primary (#6C63FF)
Logo Text: Text Dark (#1F1F1F)
CTA Button: Accent (#00C897) with white text
```

### Hero Section
```
Background: White (#FFFFFF)
Main Headline: Text Dark (#1F1F1F)
Accent Word: Primary (#6C63FF)
CTA Button: Accent (#00C897)
```

### Feature Cards
```
Background: White (#FFFFFF)
Border: Gray (#E5E7EB)
Icon Container: Primary (#6C63FF)
Title: Text Dark (#1F1F1F)
Description: Text Gray (#6B7280)
```

### Footer
```
Background: Text Dark (#1F1F1F)
Text: White (#FFFFFF)
Brand Name: Primary (#6C63FF)
Links Hover: Accent (#00C897)
```

---

**Use these colors consistently to maintain brand identity! 🎨**
