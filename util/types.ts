type TableColumn = {
  label: string;
  key: string;
};

type TableData = { [key: string]: string };

type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
};

export type { TableColumn, TableData, User };
