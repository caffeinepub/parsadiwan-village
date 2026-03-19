import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useNotifications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDownloads() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["downloads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDownloads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVillageInfo() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["villageInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVillageInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      message: string;
      subject: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContactForm(
        data.name,
        data.phone,
        data.email,
        data.message,
        data.subject,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
