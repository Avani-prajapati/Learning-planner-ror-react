export const mockArticleContextClosed = {
    selectedArticle: null,
    isDetailOpen: false,
    closeDetail: jest.fn(),
  };
  
  export const mockArticleContextOpen = (id = "1", closeDetail = jest.fn()) => ({
    selectedArticle: { id },
    isDetailOpen: true,
    closeDetail,
  });
  
  export const mockAuthContextGuest = {
    isAuthenticated: false,
  };
  
  export const mockAuthContextAuthenticated = {
    isAuthenticated: true,
  };