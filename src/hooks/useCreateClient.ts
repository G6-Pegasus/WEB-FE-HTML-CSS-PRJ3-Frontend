import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient, ClientType } from "../services/clientServices";

export const useCreateClient = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (client: ClientType) => addClient(client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}