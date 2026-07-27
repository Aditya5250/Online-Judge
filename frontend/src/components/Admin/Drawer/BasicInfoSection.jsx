
export default function BasicInfoSection(
    {
        formData,
        setFormData,
        handleChange
    }
){
    return(
        <>
            {/* Title */}

            <div>

              <label className="mb-2 block font-medium text-white">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Two Sum"
                className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:border-yellow-400
                "
              />

            </div>

            {/* Slug */}

            <div>

              <label className="mb-2 block font-medium text-white">
                Slug
              </label>

              <input
                readOnly
                value={formData.slug}
                className="
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-800
                px-4
                py-3
                text-zinc-400
                "
              />

            </div>

            {/* Difficulty */}

            <div>

              <label className="mb-2 block font-medium text-white">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:border-yellow-400
                "
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>

            </div>

            {/* Tags */}

            <div>

              <label className="mb-2 block font-medium text-white">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Arrays, HashMap"
                className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:border-yellow-400
                "
              />

              <p className="mt-2 text-sm text-zinc-500">
                Separate tags with commas.
              </p>

            </div>

            {/* Published */}

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-white">
                Publish immediately
              </span>

            </label>        
        </>
    )   
}

