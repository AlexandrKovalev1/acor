export const nodes = [
  {
    key: '0',
    label: 'Функциональные классы',
    selectable: false,

    children: [
      {
        key: '0-0',
        label: 'Оборудование',
        data: '/equipment',
        children: [
          {
            key: '0-0-0',
            label: 'КИПиА',
            data: '/kipia',
            children: [
              {
                key: '0-0-0-0',
                label: 'Датчик',
                data: '/sensor',
                children: [
                  { key: '0-0-0-0-0', label: 'Датчик давления', data: '/', leaf: false },
                  { key: '0-0-0-0-1', label: 'Уровнемер', data: '/' },
                ],
              },
              {
                key: '0-0-0-1',
                label: 'Измерительный контур',
                data: '/',
              },
            ],
          },
          {
            key: '0-0-1',
            label: 'Клапан',
            data: '/',
            children: [
              {
                key: '0-0-1-0',
                label: 'Клапан регулирующий',
                data: '/',
              },
            ],
          },
          {
            key: '0-0-2',
            label: 'Механическое оборудование',
            data: '/',
            children: [
              {
                key: '0-0-2-0',
                label: 'Резервуар',
                data: '/',
                children: [
                  {
                    key: '0-0-2-0-0',
                    label: 'Сепаратор',
                    data: '/',
                  },
                ],
              },
              {
                key: '0-0-2-1',
                label: 'Насос',
                data: '/',
                children: [
                  {
                    key: '0-0-2-1-0',
                    label: 'Центробежный насос',
                    data: '/',
                  },
                ],
              },
              {
                key: '0-0-2-2',
                label: 'Трубопроводное оборудование',
                data: '/',
                children: [
                  {
                    key: '0-0-2-2-0',
                    label: 'Трубопровод',
                    data: '/',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '0-1',
        label: 'Ограждение',
        data: '/',
        children: [
          {
            key: '0-1-0',
            label: 'Шкаф',
            data: '/',
          },
        ],
      },
    ],
  },
]
