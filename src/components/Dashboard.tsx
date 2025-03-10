import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Grid, Typography, LinearProgress, Box } from '@mui/material';
import { AccountBalance, ShoppingCart, AttachMoney, TrendingUp } from '@mui/icons-material';

type DashboardData = {
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  growthRate: number;
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card className="glass-effect">
            <CardContent>
              <Box display="flex" alignItems="center">
                <AccountBalance sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">总销售额</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2 }}>
                ￥{data?.totalSales.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="glass-effect">
            <CardContent>
              <Box display="flex" alignItems="center">
                <ShoppingCart sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">订单总量</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {data?.orderCount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="glass-effect">
            <CardContent>
              <Box display="flex" alignItems="center">
                <AttachMoney sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">客单价</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2 }}>
                ￥{data?.averageOrderValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="glass-effect">
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUp sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">同比增长</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2 }} color="secondary">
                {data?.growthRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}