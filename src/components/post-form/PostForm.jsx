import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import appwriteService from "../../appwrite/config";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from "../Button";
import Input from "../container/Input";
import Select from "../Select";
import RTE from "../RTE";


function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || "",
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })

    const navigate = useNavigate()
    const authState = useSelector(state => state.auth)

console.log("AUTH STATE:", authState)

const userData = authState?.userData

    const submit = async (data) => {
        if(post) {
           const file = data.image?.[0]
                            ? await appwriteService.uploadFile(data.image[0])
                            : null
            
            if(file){
                await appwriteService.deleteFile(post.featureImage)
            }

         const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featureImage: file ? file.$id : post.featureImage,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }

        } else {
            const file = await appwriteService.uploadFile(data.image[0]) // write a to do improve it give agrument adn its benefit
            
            if(file){
               const fileId = file.$id
               data.featureImage = fileId
            console.log("FEATURE IMAGE:", data.featureImage)
    console.log("USER DATA:", userData)
    console.log("USER ID:", userData?.$id)
               const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,

               })
               if(dbPost){
                  navigate(`/post/${dbPost.$id}`)
               }

            }
        }

    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^\w]+/g, '-')
        }

            return ''
        

    },[])

    React.useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
               setValue(
                        'slug',
                         slugTransform(value.title),
                        { shouldValidate: true }
                    )
            }
        }) // use variable for optimization

        return () => {
            subscription.unsubscribe() // this optimize the memory management and how
        }

    },[watch, slugTransform, setValue]) // how to optimize 

  return (
  <form
    onSubmit={handleSubmit(submit)}
    className="flex flex-wrap rounded-2xl border border-violet-400/20 bg-slate-900/60 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.65)] backdrop-blur-xl text-slate-100 "
  >
    <div className="w-full px-2 lg:w-2/3">
      <Input
        label="Title :"
        placeholder="Title"
        className="mb-4"
        {...register("title", { required: true })}
      />

      <Input
        label="Slug :"
        placeholder="Slug"
        className="mb-4"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />

      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
        className="text-slate-100"
      />
    </div>

    <div className="w-full px-2 lg:w-1/3">
      <Input
        label="Feature image :"
        type="file"
        className="mb-4 file:mr-3 file:rounded-md file:border-0 file:bg-violet-500/20 file:px-3 file:py-1.5 file:text-sm file:text-cyan-200 hover:file:bg-violet-500/30"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />

      {post && (
        <div className="mb-4 w-full overflow-hidden rounded-lg border border-white/10">
          <img
            src={appwriteService.getFileView(post.featureImage)}
            alt={post.title}
            className="w-full"
          />
        </div>
      )}

      <Select
        options={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
      />

      <Button
        type="submit"
        bgColor={
          post
            ? "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800"
            : "bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700"
        }
        className="w-full text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </div>
  </form>
);
}

export default PostForm