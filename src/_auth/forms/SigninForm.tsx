import * as z from "zod"
import {
  Form,
  FormControl,
FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignInValidation } from "@/lib/validation"
import Loader from "@/components/Shared/Loader"
import { Link , useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import {  useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"



  

const SigninForm = () => {
  
  const {toast} = useToast();
  const {checkAuthUser, isLoading : isUserLoading} = useUserContext();
const navigate = useNavigate();




  const {mutateAsync : signInAccount} = useSignInAccountMutation();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignInValidation>>({
      resolver: zodResolver(SignInValidation),
      defaultValues: {
        email: "",
        password: "",

      },
    })
   
    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof SignInValidation>) {
 const session = await  signInAccount({
    email : values.email,
    password : values.password,
  })

  if(!session){
    return toast ({
      title : 'Sign in failed . Please try again'
    })
  }
  const isLoggedIn = await checkAuthUser();

  if(isLoggedIn){
    form.reset();

    navigate('/')

  }else{
   return   toast({ title : 'Sign up failed . Please ry again. '})
  }
    }
 
  return (
  
       <Form {...form}>

        <div className="flex-col sm:w-420 flex-center">
          <img src="/assets/images/connectify.png" alt="" className="w-64" />
          <h2 className=" h3-bold md:h2-bold">Log in to account</h2>
          <p className="mt-2 text-light-3 small-medium md:base-regular">Welcome back mate!</p>
       
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col w-full gap-5 mt-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4 shad-button_primary">
          {isUserLoading ? (
            <div className="gap-2 flex-center "><Loader></Loader>Loading</div>
          ): "Sign in"}</Button>
          <p className="mt-2 text-center text-small-regular text-light-2">
           Dont have an account? <Link to="/sign-up" className="ml-1 text-primary-500 text-small-semibold">Sign up</Link>
          </p>
      </form>
      </div>
    </Form>


  
  )
}

export default SigninForm