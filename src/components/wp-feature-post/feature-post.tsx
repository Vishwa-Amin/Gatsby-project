import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import {
  FeaturedPostWrapper,
  PostPreview,
  PostDetails,
  PostTitle,
  PostMeta,
  PostTags,
} from './feature-post.style';

interface FeaturedPostProps {
  image?: any;
  title: string;
  url: string;
  tags?: anu;
  className?: string;
  imageType?: 'fixed' | 'fluid';
  placeholderBG?: string;
}

const FeaturedPost: React.FunctionComponent<FeaturedPostProps> = ({
  image,
  title,
  url,
  tags,
  className,
  imageType,
  placeholderBG,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ['featured_post'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  const previewImage = useStaticQuery(graphql`
    query {
      image: file(absolutePath: {regex: "/assets/preview.jpg/"}) {
        childImageSharp {
          fluid(maxWidth: 90, maxHeight: 90, quality: 100) {
            base64
            src
            srcSetWebp
            srcWebp
            tracedSVG
            srcSet
            aspectRatio
          }
        }
      }
    }
  `);

  if(image == null){
    image = previewImage.image.childImageSharp.fluid;
  }

  return (
    <FeaturedPostWrapper className={addAllClasses.join(' ')} {...props}>
      {image == null ? null : (
        <PostPreview className="post_preview">
          <Link to={url}>
            {imageType === 'fluid' ? (
              <Img
                fluid={image}
                alt="post preview"
                backgroundColor={placeholderBG}
              />
            ) : (
              <Img
                fixed={image}
                alt="post preview"
                backgroundColor={placeholderBG}
              />
            )}
          </Link>
        </PostPreview>
      )}

      <PostDetails>
        <PostTitle className="post_title">
          <Link to={url}>{title}</Link>
        </PostTitle>
        <PostMeta>
          {tags == null ? null : (
            <PostTags className="post_tags">
              {tags.nodes.slice(0, 2).map((tag: any, index: number) => (
                <Link
                  key={index}
                  to={`/tags/${_.kebabCase(tag.slug)}/`}
                >{`#${tag.name}`}</Link>
              ))}
            </PostTags>
          )}
        </PostMeta>
      </PostDetails>
    </FeaturedPostWrapper>
  );
};

FeaturedPost.defaultProps = {
  imageType: 'fluid',
};

export default FeaturedPost;
