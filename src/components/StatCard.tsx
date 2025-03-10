import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { SvgIconProps } from '@mui/material';

type StatCardProps = {
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  color?: 'primary' | 'secondary' | 'inherit';
};

export default function StatCard({
  icon,
  title,
  value,
  prefix = '',
  suffix = '',
  color = 'inherit'
}: StatCardProps) {
  return (
    <Card className="glass-effect" sx={{ 
      minWidth: 280,
      minHeight: 160,
      background: 'linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.25)',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(12px)'
      }
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" sx={{ gap: 1.5 }}>
          {React.cloneElement(icon, {
            sx: { 
              fontSize: 44,
              padding: 1,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent)',
              borderRadius: '8px',
              color
            }
          })}
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{title}</Typography>
        </Box>
        <Typography 
          variant="h4"
          sx={{ mt: 2 }}
          color={color}
        >
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </Typography>
      </CardContent>
    </Card>
  );
}