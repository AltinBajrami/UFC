import { toast } from "react-toastify";
import customFetch from "../../utils";
import { redirect } from "react-router-dom";

export const action = (queryClient) => async ({ params }) => {
    try {
        await customFetch.delete('/events/' + params.id);
        queryClient.invalidateQueries(['events'])
        toast.success('Event deleted successfully');
    } catch (error) {
        toast.error(err?.response?.data?.msg);
    }
    return redirect('/events');
}

