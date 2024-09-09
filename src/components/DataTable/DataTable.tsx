import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import { MainTheme } from '@src/config/theme';

interface IDataTableProps {
  collumns: IDataTableCollumn[];
  rows: { [key: string]: any }[];
  containerClassName?: string;
  containerStyle?: CSSProperties;
  headerClassName?: string;
  headerStyle?: CSSProperties;
  rowClassName?: string;
  rowStyle?: CSSProperties;
  onBack?: () => void;
  onNext?: () => void;
  page?: number | string;
  pageCount?: number | string;
}

interface IDataTableCollumn {
  field: string,
  name: string
}

const DataTable = (props: IDataTableProps) => {
  return (
    <div className='flex flex-col w-full'>
      <div className={props.containerClassName ?? 'flex w-full'} style={props.containerStyle}>
        {props.collumns.map((collumn) => (
          <div key={collumn.field}
            className={props.headerClassName ?? 'flex flex-col w-full items-center'}
            style={props.headerStyle ?? {
              borderColor: MainTheme.borderPrimaryColorBorder,
              borderWidth: 1,
            }}><span className='py-3'>{collumn.name}</span>
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
      <div className='flex w-full justify-end p-2'>
        <button onClick={props.onBack} className='p-2'><LeftOutlined size={500}/></button>
        <span className='p-2' >{props.page} / {props.pageCount}</span>
        <button onClick={props.onNext}  className='p-2'><RightOutlined /></button>
      </div>
    </div>
  )
}

export default DataTable;