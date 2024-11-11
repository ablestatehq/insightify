export const MODALS = {
  'comments': `query($start: Int, $limit: Int){
    comments(pagination: { start: $start, limit: $limit }){
    meta {
        pagination {
          total
        }
      }
      data{
        id
        attributes{
          comment
          resourceId
          type
          publishedAt
          author{
            data{
              id
              attributes{
                username
                isAvailable
                firstName
                lastName
                createdAt
                photo{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,

  'me': `query{
    me{
      email,
      username,
      confirmed,
      gender,
    }
  }`,

  'notificationTokens': `query($start: Int, $limit: Int){
  notificationTokens(sort: "publishedAt:desc", pagination: { start: $start, limit: $limit }){
    data{
      id,
      attributes{
        tokenID
      }
    }
  }
  }`,

  'techTips': `query($start: Int, $limit: Int){
    techTips(sort: "publishedAt:desc", pagination: { start: $start, limit: $limit }){
    meta {
        pagination {
          total
        }
      }
      data{
        id
        attributes{
          title
          details
          source_url
          authors
          tags
          source_url_text
        }
      }
    }
  }`,

  'opportunities': `query($start: Int, $limit: Int){
    opportunities(sort: "publishedAt:desc", pagination: { start: $start, limit: $limit }){
    meta {
        pagination {
          total
        }
      }
      data{
        id,
        attributes{
          Title,
          Category,
          Role,
          URL,
          Expires,
          Location,
          publishedAt,
          compensation, 
          Company,
          Description,
          company_logo{
            data{
              id,
              attributes{
                url
              }
            }
          },
          cover_image{
            data{
              id,
              attributes{
                url
              }
            }
          },
        }
      }
    }
  }`,

  'sentNotifications': `query($start: Int, $limit: Int){
    sentNotifications(pagination: { start: $start, limit: $limit }){

    }
  }`,
  'communityMembers':`query($start: Int, $limit: Int){
  communityMembers(pagination: { start: $start, limit: $limit }){
    data{
      id,
      attributes{
        email,
        country,
        phoneNumber,
        isWhatsAppPhone,
        primaryRole
      }
    }
  }
  }`,
  'products':`query($start: Int, $limit: Int){
  products(pagination: { start: $start, limit: $limit }){
  meta {
        pagination {
          total
        }
      }
    data{
      id
      attributes{
        name
        tagline
        description
        createdAt
        status
        totalViews
        media{
          data{
            id
            attributes{
              url
            }
          }
        }
        tutorial{
          data{
            id
          }
        }
        uploadedBy{
          data{
            id
            attributes{
              firstName
              lastName
              primaryDomain
            }
          }
        }
        url
        meta
      }
    }
  }
  }
`
}