import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  platform: 'mobile' | 'web';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  platform,
}) => {
  const isPositive = change !== undefined && change >= 0;

  if (platform === 'web') {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          {icon && (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500">vs last period</span>
          </div>
        )}
      </div>
    );
  }

  // Mobile implementation is handled in native components
  return null;
};
