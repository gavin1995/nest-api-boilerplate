export const sequelizePaginationData = (data, T) => {
  if (!data) {
    return {
      count: 0,
      rows: [],
    };
  }
  return {
    count: data.count,
    rows: data.rows.map((item) => {
      return new T(item.dataValues);
    }),
  };
};

export const sequelizeListData = (data, T) => {
  if (!data) return [];
  return data.map((item) => new T(item.dataValues));
};

// 处理单条base数据，解析一层dataValues
export const sequelizeBaseData = (data, T) => {
  if (!data) return null;
  return new T(data.dataValues);
};

// 数组去掉值隐式转换为false的元素
export const compact = array => {
  let resIndex = 0;
  const result = [];

  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
};
