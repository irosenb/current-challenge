# Current Challenge

## Endpoint
https://floating-waters-78255.herokuapp.com/

## POST /visit
Schema: {
  userId, name
}

returns: {visitId}

## GET /visit

Schema: {
  visitId,
  OR
  {
    userId,
    searchString
  }
}

returns: [{userId, name, visitId}]
