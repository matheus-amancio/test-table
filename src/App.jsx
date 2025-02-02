import { Dropdown, ListItem, Table, TableCell } from 'squid-subweb-ui';
import './App.css';
import { useState } from 'react';

export function App() {
  const [tableData, setTableData] = useState([
    {
      pipe: 'Pipe 1',
      aliases: 'Alias 1, Alias 2',
      surveys: ['Survey 1', 'Survey 2'],
      selectedSurvey: '',
    },
    {
      pipe: 'Pipe 2',
      aliases: 'Alias 3, Alias 4',
      surveys: ['Survey 3', 'Survey 4'],
      selectedSurvey: '',
    },
    {
      pipe: 'Pipe 3',
      aliases: 'Alias 5, Alias 6',
      surveys: ['Survey 5', 'Survey 6', 'Survey 7'],
      selectedSurvey: '',
    },
  ]);

  return (
    <div style={{ backgroundColor: '#162f3c' }}>
      <Table
        onSelect={(record, index, cell) => {
          if (cell.dataIndex === 'surveys') {
            return;
          }
          if (record.selectedSurvey !== '') {
            alert('Você selecionou ' + JSON.stringify(record));
          }
        }}
        columns={[
          {
            dataIndex: 'pipe',
            flex: '1',
            label: 'Pipe',
          },
          {
            dataIndex: 'aliases',
            flex: '1',
            label: 'Aliases',
          },
          {
            cellRenderer: function noRefCheck(text, item) {
              return (
                <TableCell
                  horizontalAlign='center'
                >
                  <Dropdown
                  width='100%'
                    onChange={(e) => {
                      setTableData((old) => {
                        return old.map((row) => {
                          if (row.pipe === item.pipe) {
                            return {
                              ...row,
                              selectedSurvey: e.value,
                            };
                          }
                          return row;
                        });
                      });
                    }}
                    size='small'
                  >
                    {item.surveys.map((survey) => (
                      <ListItem key={survey} title={survey} />
                    ))}
                  </Dropdown>
                </TableCell>
              );
            },
            dataIndex: 'surveys',
            flex: '1',
            label: 'Surveys',
          },
        ]}
        dataSource={tableData}
        height='200px'
        rowHeight='32px'
        width='600px'
      />
    </div>
  );
}
