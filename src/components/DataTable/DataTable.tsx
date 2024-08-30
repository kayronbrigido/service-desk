import { CSSProperties } from 'react';
import { MainTheme } from '@src/config/theme';

interface IDataTableProps {
  collumns: IDataTableCollumn[]
  rows: { [key: string]: any }[];
  containerClassName?: string;
  containerStyle?: CSSProperties;
  headerClassName?: string;
  headerStyle?: CSSProperties;
  rowClassName?: string;
  rowStyle?: CSSProperties;
}

interface IDataTableCollumn {
  field: string,
  name: string
}

const DataTable = (props: IDataTableProps) => {
  return (
    <div className={props.containerClassName ?? 'flex w-full'} style={props.containerStyle}>
      {props.collumns.map((collumn) => (
        <div key={collumn.field}
          className={props.headerClassName ?? 'flex flex-col w-full items-center py-5'}
          style={props.headerStyle ?? {
            borderColor: MainTheme.borderPrimaryColorBorder,
            borderWidth: 1,
          }}>{collumn.name}
          {
            props.rows.map((row, _) => (
              <div key={row['id'] ?? _} className={props.rowClassName ?? 'flex flex-col justify-start w-full px-5 py-2'}
                style={{
                  ...props.rowStyle,
                  backgroundColor: _ % 2 === 0 ? MainTheme.rowOddColor : MainTheme.rowEvenColor,
                  borderColor: MainTheme.borderPrimaryColorBorder,
                  borderTopWidth: 1,
                }}>
                {row[collumn.field]}
              </div>
            ))
          }
        </div>
      )
      )}
    </div >
  )
}

export default DataTable;