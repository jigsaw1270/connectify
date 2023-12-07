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
import { SignUpValidation } from "@/lib/validation"
import Loader from "@/components/Shared/Loader"
import { Link } from "react-router-dom"


  

const SignupForm = () => {

  const isLoading = false;

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
      resolver: zodResolver(SignUpValidation),
      defaultValues: {
        name: "",
        username: "",
        email: "",
        password: "",

      },
    })
   
    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof SignUpValidation>) {
  // const newUser  = await createUserAccount(values);
    }
 
  return (
  
       <Form {...form}>

        <div className="flex-col sm:w-420 flex-center">
          <img src="/assets/images/connectify.png" alt="" className="w-64" />
          <h2 className=" h3-bold md:h2-bold">Create a new account</h2>
          <p className="mt-2 text-light-3 small-medium md:base-regular">Connect with Connectify! Enter your details</p>
       
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col w-full gap-5 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
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
          {isLoading? (
            <div className="gap-2 flex-center "><Loader></Loader>Loading</div>
          ): "Sign up"}</Button>
          <p className="mt-2 text-center text-small-regular text-light-2">
            Already a user ? <Link to="sign-in" className="ml-1 text-primary-500 text-small-semibold">Log in</Link>
          </p>
      </form>
      </div>
    </Form>


  
  )
}

export default SignupForm