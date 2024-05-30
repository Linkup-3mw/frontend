import API from '@/utils/axios';

//산업군 전체 조회
export const getIndustry = async () => {
  try {
    const res = await API.get('/category/industry');
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

//직종 전체 조회
export const getOccupation = async () => {
  try {
    const res = await API.get('/category/occupation');
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
