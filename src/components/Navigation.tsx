import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  Theme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface Props {
  loggedIn: boolean;
}

export default function Navigation({ loggedIn }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // 登出逻辑
    localStorage.removeItem('token');
    window.location.reload();
  };
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) return null;

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/data-storage', label: '数据存储' },
    { path: '/visualization', label: '数据可视化' }
  ].filter(item => item.path !== '/' || loggedIn);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        {isMobile && (
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {!isMobile && (
          <>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ mx: 1 }}
              >
                {item.label}
              </Button>
            ))}
          </>
        )}

        <div style={{ flexGrow: 1 }} />
        
        {!isAuthPage && loggedIn ? (
          <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>退出登录</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" component={Link} to="/login">登录</Button>
        )}
      </Toolbar>

      {/* 移动端菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && isMobile}
        onClose={handleMenuClose}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={() => setAnchorEl(null)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}