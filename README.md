# Tic Tac Toe LLD [![wakatime](https://wakatime.com/badge/user/b4d90a09-8caf-45db-8a08-9d1dc7e98e84/project/f36223ed-baed-4985-ad7a-9bcfb6fd2d1a.svg)](https://wakatime.com/badge/user/b4d90a09-8caf-45db-8a08-9d1dc7e98e84/project/f36223ed-baed-4985-ad7a-9bcfb6fd2d1a)

## Sample Output

For the following board play

```ts
const plays: string[][] = [
    ["1 X", "", "5 X"],
    ["7 X", "3 X", "2 O"],
    ["6 O", "8 O", "4 O"]
  ];

/*
  [
    [0, 0],
    [1, 2],
    [1, 1],
    [2, 2],
    [0, 2],
    [2, 0],
    [2, 1],
    [0, 1],
    [1, 0]
  ]
*/
```

```text

_ | _ | _
_ | _ | _
_ | _ | _

Player Abhisek [X]
Player Chandni [O]
Current Player Abhisek [X] moves [0, 0]
X | _ | _
_ | _ | _
_ | _ | _

Current Player Chandni [O] moves [1, 2]
X | _ | _
_ | _ | O
_ | _ | _

Current Player Abhisek [X] moves [1, 1]
X | _ | _
_ | X | O
_ | _ | _

Current Player Chandni [O] moves [2, 2]
X | _ | _
_ | X | O
_ | _ | O

Current Player Abhisek [X] moves [0, 2]
X | _ | X
_ | X | O
_ | _ | O

Current Player Chandni [O] moves [2, 0]
X | _ | X
_ | X | O
O | _ | O

Current Player Abhisek [X] moves [1, 0]
X | _ | X
X | X | O
O | _ | O

Current Player Chandni [O] moves [2, 1]
X | _ | X
X | X | O
O | O | O

Winner Player Chandni [O]

```

# License

See [License](./LICENSE)