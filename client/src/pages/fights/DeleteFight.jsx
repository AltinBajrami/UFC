import { toast } from "react-toastify";
import customFetch from "../../utils";
import { redirect } from "react-router-dom";

export const action = (queryClient) => async ({ params }) => {
    try {
        await customFetch.delete('/fights/' + params.id);
        queryClient.invalidateQueries(['fights'])
        toast.success('Fight deleted successfully');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    return redirect('/fights');
}

