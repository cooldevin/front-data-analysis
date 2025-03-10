import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Grid, Typography, LinearProgress, Box, Chip } from '@mui/material';
import { AccountBalance, ShoppingCart, AttachMoney, TrendingUp } from '@mui/icons-material';
import { number } from 'echarts';
import StatCard from './StatCard';

type DashboardData = {
  totalSales: number;
  totalOrders: number;
  orderCount: number;
  averageOrderValue: number;
  growthRate: number;
  salesByRegion: { region: string; sales: number }[];
  topProducts: { productName: string; quantity: number; totalRevenue: number; averagePrice: number; growthRate: number }[];
  salesByCategory: { category: string; sales: number }[];
  salesTrend: { date: string; sales: number }[];
};


export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      axios.get('http://localhost:8080/sales/overview/dashboard')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('无法获取仪表盘数据');
        setLoading(false);
      });
  }, []);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>销售总览</Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={3} sx={{ display: 'flex' }}>
          <StatCard
            icon={<AttachMoney />}
            title="总销售额"
            value={data?.totalSales || 0}
            prefix="￥"
          />
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex' }}>
          <StatCard
            icon={<ShoppingCart />}
            title="销售总量"
            value={data?.totalOrders || 0}
          />
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex' }}>
          <StatCard
            icon={<AttachMoney />}
            title="客单价"
            value={data?.averageOrderValue || 0}
            prefix="￥"
          />
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex' }}>
          <StatCard
            icon={<TrendingUp />}
            title="同比增长"
            value={data?.growthRate?.toFixed(2) ?? '0.00'}
            suffix="%"
            color="secondary"
          />
        </Grid>
        
        {/* 热销产品展示 */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>热销产品排行榜</Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2 }}>
            {data?.topProducts?.slice(0,5).map((product, index) => (
              <Card key={product.productName} className="glass-effect" sx={{ 
                minWidth: 280,
                minHeight: 160,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ position: 'relative' }}>
                      <TrendingUp sx={{ 
                        fontSize: 32,
                        color: index === 0 ? '#ffd700' : '#4a90e2',
                        opacity: 0.8
                      }} />
                      <Typography variant="body2" sx={{ 
                        position: 'absolute',
                        bottom: -8,
                        right: -8,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        px: 0.5,
                        borderRadius: 1
                      }}>
                        {product.growthRate > 0 ? `+${product.growthRate}%` : 'N/A'}
                      </Typography>
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="h6" sx={{ mb: 0.5, lineHeight: 1.2 }}>
                        #{index + 1} {product.productName}
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip
                          label={`¥${product.averagePrice?.toFixed(2) || '0.00'}`}
                          size="small"
                          sx={{ 
                            bgcolor: product.averagePrice > 500 ? '#ff444433' : 
                                   product.averagePrice > 200 ? '#ff910033' : '#4caf5033',
                            color: product.averagePrice > 500 ? '#ff4444' : 
                                  product.averagePrice > 200 ? '#ff9100' : '#4caf50'
                          }}
                        />
                        <Chip 
                          label={`销量 ${product.quantity?.toLocaleString()}`}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box mt={1.5} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      总销售额
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ¥{(product.totalRevenue || 0).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}