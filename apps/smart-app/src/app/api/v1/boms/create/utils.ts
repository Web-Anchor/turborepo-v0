export const MUTATION = `
  mutation CreateBOM($data: BOMCreateInput!) {
    createBOM(data: $data) {
      id
    }
  }
`;
