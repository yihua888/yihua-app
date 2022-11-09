let firstMenu = "";
export function mapMenusToRotes(userMenus) {
  const routes = [];
  // 1.先去加载默认所以的routes
  const allRoutes = [];
  const routeFiles = import.meta.globEager('@/router/main/**/*.js');
  for (const path in routeFiles) {
    allRoutes.push(routeFiles[path].default);
  }

  // 2.根据菜单获取需要添加的routes
  const recuresGetRote = (menus) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu;
        }
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
      } else {
        recuresGetRote(menu.children);
      }
    }
  };
  recuresGetRote(userMenus);

  return routes;
}

export function pathMapBreadcrumbs(userMenus, currentPath) {
  const breadcrumbs = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToMenu(userMenus, currentPath, breadcrumbs = null) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function menuMapLeafKeys(menuList) {
  const leftKeys = [];

  const _recurseGetLeaf = (menuList) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);

  return leftKeys;
}

export { firstMenu };
